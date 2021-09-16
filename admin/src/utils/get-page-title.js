import defaultSettings from '@/settings'

const title = defaultSettings.title || '合和集采服务平台管理后台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
