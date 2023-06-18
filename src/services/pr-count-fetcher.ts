import {Octokit} from 'octokit'
import {StatsFetcher} from '../interfaces/stats-fetcher'

export class PRCountFetcher implements StatsFetcher {
  constructor(private octokit: Octokit) {}
  async fetchStats(author: string): Promise<string> {
    const openedQuery = `repo:${'iisyos'}/${'portfolio'} author:${author} is:pr`
    const {data: openedData} =
      await this.octokit.rest.search.issuesAndPullRequests({
        q: openedQuery
      })
    const openedCount = openedData.items.length

    const mergedQuery = `repo:${'iisyos'}/${'portfolio'} author:${author} is:pr`
    const {data: mergedData} =
      await this.octokit.rest.search.issuesAndPullRequests({
        q: mergedQuery
      })
    const mergedCount = mergedData.items.length

    return `opened PRs: ${openedCount}\nMerged PRs: ${mergedCount}\n`
  }
}
