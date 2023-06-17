import {Octokit} from 'octokit'
import {StatsFetcher} from '../interfaces/stats-fetcher'

export class CommitCountFetcher implements StatsFetcher {
  constructor(private octokit: Octokit) {}

  async fetchStats(contributor: string): Promise<string> {
    const commitCount = 0
    return `Commits: ${commitCount}\n`
  }
}
