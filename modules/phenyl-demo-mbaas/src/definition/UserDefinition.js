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
      ttl: 1000 * 60 * 60,
    });
  }
  async authorization(): Promise<boolean> {
    return true;
  }

  async wrapExecution(reqData, session, execute): Promise<*> {
    const resData = await execute(reqData, session);
    console.log(reqData, session, resData);
    const { entity } = await this.entityClient.get({
      entityName: "user",
      id: "hoge",
    });
    console.log("-------------------------------------");
    console.log(entity);
    console.log("-------------------------------------");
    return resData;
  }
}
