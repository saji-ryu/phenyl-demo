// @flow
import type { EntityClient } from "phenyl-interfaces";
import { StandardUserDefinition } from "phenyl-standards";
import type { EntityMap } from "phenyl-demo-interfaces";
type AuthSetting = any;

export default class AdminDefinition extends StandardUserDefinition<
  EntityMap,
  AuthSetting
> {
  constructor(entityClient: EntityClient<EntityMap>) {
    super({
      entityClient: entityClient,
      accountPropName: "email",
      passwordPropName: "password",
      ttl: 1000 * 60 * 60
    });
  }
  authorization = true;
}
