import {StatsFetcher} from '../interfaces/stats-fetcher'

export class IssueBodyBuilder {
  private fetchers: StatsFetcher[] = []

  registerFetcher(fetcher: StatsFetcher): this {
    this.fetchers.push(fetcher)
    return this
  }

  async buildBody(contributors: string[]): Promise<string> {
    let body = ''
    for (const contributor of contributors) {
      body += `## @${contributor}\n`
      for (const fetcher of this.fetchers) {
        body += await fetcher.fetchStats(contributor)
      }
      body += '\n'
    }
    return body
  }
}
