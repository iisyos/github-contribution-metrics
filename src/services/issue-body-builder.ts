import {StatsFetcher} from '../interfaces/stats-fetcher'
import {Option} from '../option'
export class IssueBodyBuilder {
  private fetchers: StatsFetcher[] = []
  private option: Option
  constructor(option: Option) {
    this.option = option
  }

  registerFetcher(fetcher: StatsFetcher): this {
    this.fetchers.push(fetcher)
    return this
  }

  async buildBody(contributors: string[]): Promise<string> {
    let body = ''
    for (const contributor of contributors) {
      body += `## @${contributor}\n`
      for (const fetcher of this.fetchers) {
        body += await fetcher.fetchStats(contributor, this.option)
      }
      body += '\n'
    }
    return body
  }
}
