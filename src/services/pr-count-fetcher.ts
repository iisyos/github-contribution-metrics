import {Octokit} from 'octokit'
import {StatsFetcher} from '../interfaces/stats-fetcher'
import {Option} from '../option'

export class PRCountFetcher implements StatsFetcher {
  constructor(private octokit: Octokit) {}
  async fetchStats(author: string, option: Option): Promise<string> {
    let body = ''
    const openedQuery = `repo:${option.owner}/${option.repo} author:${author} is:pr created:${option.since}..${option.until}`
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

    const mergedQuery = `repo:${option.owner}/${option.repo} author:${author} is:pr merged:${option.since}..${option.until}`
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
