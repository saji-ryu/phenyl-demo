// @flow
import express from 'express'
import cors from 'cors'
import _debug from 'debug'
// import Raven from 'raven'
import PhenylRestApi from 'phenyl-rest-api'
import type { EntityClient } from 'phenyl-interfaces'
import { createEntityClient as createMemoryClient } from 'phenyl-memory-db'
//import { createEntityClient as createMongoDBClient, connect } from 'phenyl-mongodb'
import { createPhenylMiddleware } from 'phenyl-express'
// import {
//     //createUserDefinitions,
//     createNonUserDefinitions,
//     createCustomCommandDefinitions,
// } from './definition'
// $FlowIssue(why-not-defined-exists-package)
// import fixtures from 'phenyl-demo-domain/test/fixtures'
import type {
    EntityMap,
} from 'phenyl-demo-interfaces'

import insertFixtures from './insertFixtures'
// import customRequestHandler from './customRequestHandler'
//import auditLog from './middleware/auditLog'

const debug = _debug('phenyl-demo-mbaas:server')
const __DEV__ = process.env.NODE_ENV === 'development'

// const MBAAS_ENDPOINT = process.env.MBAAS_ENDPOINT   // 自身のURL。アクセスするためのリンク等を示す際に利用(メール等)
// if (!MBAAS_ENDPOINT) {
//     throw new Error('please set env MBAAS_ENDPOINT')
// }

const getConnection = async (): Promise<EntityClient<EntityMap>> => {
    if (__DEV__) {//とりあえずメモリデータベース
        debug('Use memory client')
        const client = createMemoryClient()
        const fixtures = {} // TODO: 後に初期データ投入で使いたくなるはず(by やまたつ)
        //初期データ投入
        await insertFixtures(client, fixtures)
        return client
    }
}

const main = async () => {
    /**
     * entityClientは永続化層とのやりとりの抽象
     * EntityClient<EntityMap>
     */
    //上参照clietが帰ってくる
    const entityClient: EntityClient<EntityMap> = await getConnection()
    //port番号の指定およびチェック
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8888
    if (isNaN(port)) {
        throw new Error(`Environment variable 'PORT' must be integer: ${String(process.env.PORT)}`)
    }

    //PhenylrestAPIを作成するためのfunctionGroupe
    const functionalGroup = {
        // サーバーが持つ情報を取得するカスタムAPI
        // customQueries: {},
        // サーバーに副作用を起こすカスタムAPI
        // customCommands: createCustomCommandDefinitions(entityClient),
        // ログインという概念を持つリソース
        //users: createUserDefinitions(entityClient),
        // ログインという概念を持たないリソース
        // nonUsers: createNonUserDefinitions(entityClient),
    }
    //
    const sessionClient = entityClient.createSessionClient()
    // phenylのrestAPI作成
    const restApiHandler = PhenylRestApi.createFromFunctionalGroup(functionalGroup, {
        client: entityClient,
        sessionClient,
    })

    const app = express()
    app.use(cors()) // やる
    //app.use(auditLog(sessionClient)) // やらない
    app.use(createPhenylMiddleware({ restApiHandler })) // restApiはnonUser一個、カスタムなしで作る

    app.listen(port, async () => {
        debug(`Phenyl http server listen on :${port}`)
        debug(`process.env.NODE_ENV=${String(process.env.NODE_ENV)}`)
    })
}

main().catch(error => {
    console.error(error)
    process.exit(1)
})
