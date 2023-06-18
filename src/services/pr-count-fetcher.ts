import {Octokit} from 'octokit'
import {StatsFetcher} from '../interfaces/stats-fetcher'

export class PRCountFetcher implements StatsFetcher {
  constructor(private octokit: Octokit) {}
  async fetchStats(author: string): Promise<string> {
    let body = ''
    const openedQuery = `repo:${'iisyos'}/${'portfolio'} author:${author} is:pr`
    const {data: openedData} =
      await this.octokit.rest.search.issuesAndPullRequests({
        q: openedQuery
      })
    const openedPRs = openedData.items.map(pr => {
      return {title: pr.title, url: pr.html_url}
    })
    body += `### Opened PRs\n`
    body += `Count: ${openedPRs.length}\n`
    for (const pr of openedPRs) {
      body += `- [${pr.title}](${pr.url})\n`
    }

    const mergedQuery = `repo:${'iisyos'}/${'portfolio'} author:${author} is:pr`
    const {data: mergedData} =
      await this.octokit.rest.search.issuesAndPullRequests({
        q: mergedQuery
      })
    const mergedPRs = mergedData.items.map(pr => {
      return {title: pr.title, url: pr.html_url}
    })
    body += `### Merged PRs\n`
    body += `Count: ${mergedPRs.length}\n`
    for (const pr of mergedPRs) {
      body += `- [${pr.title}](${pr.url})\n`
    }

    return body
  }
}
