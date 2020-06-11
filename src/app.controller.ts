import { Controller, Get, Req, Res, Param, HttpStatus, Body, UnauthorizedException } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
	constructor (private readonly appService: AppService) {}

	@Get()
	getServer (): string {
		return this.appService.getServer()
	}

	@Get('summoner/:name')
	async getSummonerByName (@Req() req, @Res() res, @Param('name') name: string): Promise<any> {
		const response = await this.appService.getSummonerByName(name)
		console.log(response)
		return res.status(HttpStatus.OK).json(response)
	}

	// @Get('summoner/byid/:id')
	// async getSummoner (@Req() req, @Res() res, @Param('name') name: string): Promise<any> {
	// 	const response = await this.appService.getSummonerById(name)
	// 	return res.status(HttpStatus.OK).json(response)
	// }
}
