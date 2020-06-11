import { Injectable, HttpService } from '@nestjs/common'

@Injectable()
export class AppService {
	constructor (private httpService: HttpService) {}

	getServer (): string {
		return 'LeagueUtils Backend Server'
	}

	async getSummonerByName (name: string): Promise<any> {
		const response = await this.httpService
			.get(
				`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env
					.RIOT_LOL_API_KEY}`,
			)
			.toPromise()
		return response.data
	}

	async getMasteryDataBySummonerName (name: string): Promise<any> {
		const { id } = await this.getSummonerByName(name)
		const response = await this.httpService
			.get(
				`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${process
					.env.RIOT_LOL_API_KEY}`,
			)
			.toPromise()
		return response.data
	}

	async getLowestChampionMastery (name: string): Promise<JSON> {
		const masteryData = await this.getMasteryDataBySummonerName(name)
		const lowestChamp = masteryData.reduce((element, currentElement) => {
			const { championPoints } = element
			const { highestChampionPoints } = currentElement
			return highestChampionPoints > championPoints ? element : currentElement
		})
		return lowestChamp
	}

	async getNextChampionLevelUp (name: string): Promise<JSON> {
		const masteryData = await this.getMasteryDataBySummonerName(name)
		const lowestChamp = masteryData.reduce((element, currentElement) => {
			const { championPointsUntilNextLevel } = element
			if (championPointsUntilNextLevel === 0) {
				return currentElement
			}
			if (currentElement.championPointsUntilNextLevel === 0) {
				return element
			}
			return championPointsUntilNextLevel < currentElement.championPointsUntilNextLevel ? element : currentElement
		})
		return lowestChamp
	}
}
