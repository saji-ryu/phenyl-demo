// @flow
import _debug from "debug";
import crypt from "power-crypt";

import type { EntityClient } from "phenyl-interfaces";
import type { EntityMap } from "phenyl-demo-interfaces";

const debug = _debug("phenyl-demo-mbaas:fixture");

export default async function insertFixtures(
  client: EntityClient<EntityMap>,
  fixtureGroups: { [string]: { [string]: Object } }
): Promise<void> {
  for (let entityName in fixtureGroups) {
    for (let entityId in fixtureGroups[entityName]) {
      //fixtuesの中の要素(userとか)のなかの各ID名を持つ要素に対して
      //自分のID名をidという要素を足すのを繰り返す
      const value = Object.assign(fixtureGroups[entityName][entityId], {
        id: entityId,
      });
      //passwordっていうプロパティを持っているか
      if (value.hasOwnProperty("password")) {
        //もってたら暗号化
        value.password = crypt(value.password);
      }

      try {
        //　上で作った新しい各ID名を持つ要素を保存
        // $FlowIssue(entityName-is-valid-value)
        await client.insertOne({ entityName, value });
        debug(`Inserted ${entityName}/${entityId}`);
      } catch (e) {
        debug(`An error occured in ${entityName}/${entityId}: ${e.stack}`);
      }
    }
  }
}
