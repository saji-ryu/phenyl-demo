// @flow
import _debug from 'debug'
import crypt from 'power-crypt'

import type { EntityClient } from 'phenyl-interfaces'
import type {
    EntityMap,
} from 'phenyl-demo-interfaces'

const debug = _debug('phenyl-demo-mbaas:fixture')

export default async function insertFixtures (client: EntityClient<EntityMap>, fixtureGroups: { [string]: { [string]: Object } }): Promise<void> {
    for (let entityName in fixtureGroups) {
        for (let entityId in fixtureGroups[entityName]) {
            const value = Object.assign(fixtureGroups[entityName][entityId], {
                id: entityId,
            })

            if (value.hasOwnProperty('password')) {
                value.password = crypt(value.password)
            }

            try {
                // $FlowIssue(entityName-is-valid-value)
                await client.insertOne({ entityName, value })
                debug(`Inserted ${entityName}/${entityId}`)
            } catch (e) {
                debug(`An error occured in ${entityName}/${entityId}: ${e.stack}`)
            }
        }
    }
}