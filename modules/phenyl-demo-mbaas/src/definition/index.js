// @flow
import type {
  EntityClient,
  UserDefinitions,
  EntityDefinitions,
  CustomCommandDefinitions
} from "phenyl-interfaces";
import { StandardEntityDefinition } from "phenyl-standards";
import UserDefinition from "./UserDefinition";
import type { EntityMap } from "phenyl-demo-interfaces";

export const createUserDefinitions = (
  entityClient: EntityClient<EntityMap>
): UserDefinitions => ({
  user: new UserDefinition(entityClient)
});
