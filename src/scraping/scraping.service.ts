import { Injectable } from '@nestjs/common'
import puppeteer = require('puppeteer')

@Injectable()
export class ScrapingService {
	async scrapeChampionStats (name: string): Promise<any> {
		const browser = await puppeteer.launch({ headless: false })

		const page = await browser.newPage()
		await page.goto(`https://u.gg/lol/champions/${name}/build`)

		const elements = await page.$$('.value')
		const data: string[] = []
		for (let index = 0; index < elements.length; index++) {
			data[index] = await (await elements[index].getProperty('innerHTML')).jsonValue()
		}

		const role = await (await (await page.$('.role-value > div')).getProperty('innerHTML')).jsonValue()
		await browser.close()

		return {
			champion: name,
			role: role,
			winrate: parseInt(data[0]),
			rankInRole: data[1],
			pickrate: data[2],
			banrate: parseInt(data[3]),
			matchcount: parseInt(data[4]),
		}
	}

	async scrapeSummonerStats (name: string, region: string): Promise<any> {
		const browser = await puppeteer.launch({
			headless: false,
		})

		try {
			const page = await browser.newPage()
			await page.setViewport({ width: 900, height: 1200 })
			await page.goto(`https://u.gg/lol/profile/${region}/${name}/overview`)

			await page.waitFor(4000)
		} catch (error) {
			await browser.close()
		}

		await browser.close()

		return {}
	}
}
