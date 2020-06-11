import { Injectable } from '@nestjs/common'
import * as lolapi from 'kayn'
import { KaynConfig } from 'kayn'
const { Kayn, REGIONS } = lolapi

@Injectable()
export class AppService {
	kayn: any
	constructor () {
		const kaynConfig: KaynConfig = {
			region: REGIONS.EUROPE_WEST,
			requestOptions: {
				shouldRetry: true,
				numberOfRetriesBeforeAbort: 3,
				delayBeforeRetry: 3000,
			},
		}
		this.kayn = Kayn(process.env.RIOT_LOL_API_KEY)(kaynConfig)
	}

	getServer (): string {
		return 'LeagueUtils Backend Server'
	}

	async getSummonerByName (name: string): Promise<JSON> {
		return await this.kayn.Summoner.by.name(name).region(REGIONS.EUROPE_WEST)
	}
}
