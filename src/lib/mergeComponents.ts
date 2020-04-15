import { RegionComponent } from './trello'

export default (components: RegionComponent[]) =>
  components.reduce((acc: RegionComponent[], card) => {
    const existingCard: RegionComponent | undefined = acc.find(
      (c: RegionComponent) => c.name === card.name
    )

    if (existingCard) {
      if (card.description) {
        existingCard.description =
          existingCard.description + ' \n\n---\n\n ' + card.description
      }
      existingCard.attachments.push(...card.attachments)
    } else {
      acc.push(card)
    }

    return acc
  }, [])
