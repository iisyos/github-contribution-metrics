export interface StatsFetcher {
  fetchStats(contributor: string): Promise<string>
}
