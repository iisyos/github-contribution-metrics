import {Octokit} from 'octokit'
import {StatsFetcher} from '../interfaces/stats-fetcher'

export class PRCountFetcher implements StatsFetcher {
  constructor(private octokit: Octokit) {}
  async fetchStats(author: string): Promise<string> {
    const query = `repo:${'iisyos'}/${'portfolio'} author:${author} is:pr`
    const {data} = await this.octokit.rest.search.issuesAndPullRequests({
      q: query
    })
    const openCount = data.items.filter(pr => pr.state === 'open').length
    const closedCount = data.items.filter(pr => pr.state === 'closed').length

    return `Open PRs: ${openCount}\nClosed PRs: ${closedCount}\n`
  }
}
