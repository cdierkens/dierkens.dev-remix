import * as docker from "@pulumi/docker";
import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";
import { enableCloudRun } from "../apis/enable-cloud-run";

if (!gcp.config.project) {
  throw new Error("Please set the project in the config.");
}

const location = gcp.config.region || "us-central1";

const remixImage = new docker.Image("remix-image", {
  imageName: pulumi.interpolate`gcr.io/${gcp.config.project}/remix`,
  build: {
    context: "../",
    extraOptions: ["--platform", "linux/amd64"],
  },
});

export const remix_service_account = new gcp.serviceaccount.Account(
  "remix-service-account",
  {
    accountId: `remix-service-account`,
    displayName: "Remix Service Account",
  }
);

const serviceAccountUserBinding = new gcp.serviceaccount.IAMBinding(
  "service-account-user-role",
  {
    serviceAccountId: remix_service_account.name,
    role: "roles/iam.serviceAccountUser",
    members: ["allUsers"],
  }
);

const serviceAccountSqlClientIAMBinding = new gcp.projects.IAMBinding(
  `cloudsql-client-role`,
  {
    project: gcp.config.project,
    role: "roles/cloudsql.client",
    members: [
      pulumi.interpolate`serviceAccount:${remix_service_account.email}`,
    ],
  }
);

export const remixService = new gcp.cloudrun.Service(
  "remix-service",
  {
    location,
    // https://github.com/hashicorp/terraform-provider-google/issues/5898
    autogenerateRevisionName: true,
    template: {
      spec: {
        serviceAccountName: remix_service_account.email,
        containers: [
          {
            image: remixImage.imageName,
          },
        ],
      },
    },
  },
  {
    dependsOn: [
      enableCloudRun,
      serviceAccountUserBinding,
      serviceAccountSqlClientIAMBinding,
    ],
  }
);

new gcp.cloudrun.IamMember("remix-service-iam-member", {
  service: remixService.name,
  location,
  role: "roles/run.invoker",
  member: "allUsers",
});
