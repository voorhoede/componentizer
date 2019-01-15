import generateComponentImageUrl from './generateComponentImageUrl'
import mergeComponents from './mergeComponents'

import { RegionComponent } from '../lib/trello';

function getImageFiles(components: RegionComponent[]) {
  return Promise.all(
    components
      .map(async (component: RegionComponent) => ({
        name: component.name,
        images: await Promise.all(component.attachments.map(async attachment => {
          return await fetch(attachment.url)
              .then(res => res.blob())
        }))
      }))
  )
}

export default getImageFiles
