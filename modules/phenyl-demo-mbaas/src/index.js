// @flow
import express from 'express'
import cors from 'cors'
import _debug from 'debug'
import PhenylRestApi from 'phenyl-rest-api'
import type { EntityClient } from 'phenyl-interfaces'
import { createEntityClient as createMemoryClient } from 'phenyl-memory-db'
import { createPhenylMiddleware } from 'phenyl-express'
import type {
    EntityMap,
} from 'phenyl-demo-interfaces'

import insertFixtures from './insertFixtures'

const debug = _debug('phenyl-demo-mbaas:server')
const __DEV__ = process.env.NODE_ENV === 'development'

const getConnection = async (): Promise<EntityClient<EntityMap>> => {
    if (__DEV__) {//とりあえずメモリデータベース
        debug('Use memory client')
        const client = createMemoryClient()
        const fixtures = {} // TODO: 後に初期データ投入で使いたくなるはず(by やまたつ)
        //初期データ投入
        await insertFixtures(client, fixtures)
        return client
    } else {

        // TODO: NODE_ENVがdevelopmentじゃない時の処理を書く
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

    //PhenylrestAPIを作成するためのfunctionGroupe　今は空
    const functionalGroup = {}
    // phenylsessionclientが何してるかわからない....
    const sessionClient = entityClient.createSessionClient()
    /** phenylのrestAPI作成
     * functiongroupeでAPIの挙動を指定している
     *      ぞれぞれの挙動をfunctionとして指定して渡している？
     * 2こめの引数はDBのclientを渡している
     *      これでデータベース操作が可能になる
    */
    const restApiHandler = PhenylRestApi.createFromFunctionalGroup(functionalGroup, {
        client: entityClient,
        sessionClient,
    })

    const app = express()
    // CORSを全面的に許可する
    app.use(cors()) // やる

    //　上のハンドラを元に実際にミドルウェアを作る
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
