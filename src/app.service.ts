import { Injectable, HttpService } from '@nestjs/common'

@Injectable()
export class AppService {
	constructor (private httpService: HttpService) {}

	getServer (): string {
		return 'LeagueUtils Backend Server'
	}

	async getSummonerByName (name: string) {
		const response = await this.httpService
			.get(
				`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env
					.RIOT_LOL_API_KEY}`,
			)
			.toPromise()
		return response.data
	}

	// async getSummonerById (id: string): Promise<JSON> {
	// 	return await this.kayn.Summoner.by.id(id).region(REGIONS.EUROPE_WEST)
	// }
}
