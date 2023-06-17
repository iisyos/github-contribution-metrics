import {PublishIssue} from './services/publish-issue'

async function run(): Promise<void> {
  new PublishIssue(process.env.GITHUB_TOKEN || '').publish()
}

run()
