import { Injectable, HttpService, NotFoundException } from '@nestjs/common'
@Injectable()
export class AppService {
	constructor (private httpService: HttpService) {}

	getServer (): string {
		return 'LeagueUtils Backend Server'
	}

	async getCurrentVersion () {
		const respond = await this.httpService.get(`https://ddragon.leagueoflegends.com/api/versions.json`).toPromise()
		const result = await respond
		return result[0]
	}

	async getSummonerByName (name: string): Promise<any> {
		try {
			const response = await this.httpService
				.get(
					`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env
						.RIOT_LOL_API_KEY}`,
				)
				.toPromise()
			return response.data
		} catch (error) {
			throw new NotFoundException()
		}
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

	async getMasteryDataOfChampionBySummonerNameAndChampionId (name: string, championId: number): Promise<any> {
		const { id } = await this.getSummonerByName(name)
		const response = await this.httpService
			.get(
				`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}/by-champion/${championId}?api_key=${process
					.env.RIOT_LOL_API_KEY}`,
			)
			.toPromise()
		return response.data
	}

	async getMasteryDataOfChampionBySummonerName (name: string, champion: string): Promise<any> {
		const { id } = await this.getSummonerByName(name)
		const championId = await this.getChampionIdByName(champion)
		const response = await this.httpService
			.get(
				`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}/by-champion/${championId}?api_key=${process
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

	async getChampionIdByName (name: string): Promise<number> {
		const version = await this.getCurrentVersion()
		const response = await this.httpService
			.get(` https://cdn.communitydragon.org/${version}/champion/${name}/data`)
			.toPromise()
		const result = response.data
		return result.id
	}
}
