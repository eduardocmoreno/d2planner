import { EditorWrapper, Image, Item } from "./editor.styles";

export default function Editor({ item }: {
  item: Item;
}) {
  return (
    <EditorWrapper>
      <h3>HEAD</h3>
      {!!item.id &&
        <Item>
          <Image>
            <img src={require(`assets/images/items/${item.image})?.image}.png`).default} alt={item.name} />
          </Image>
        </Item>
      }
    </EditorWrapper>
  )
}
