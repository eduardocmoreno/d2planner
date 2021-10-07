import { useEffect, useState } from "react";
import styled from "styled-components";

interface IGearStats {
  defense?: number | null;
}

const statsInit: IGearStats = {
  defense: null,
}

export default function Item({ items, title, icon }: { items: IGearItem[], title: string, icon: string }) {

  const [stats, setStats] = useState(statsInit);
  const [selectedItem, setSelectedItem] = useState({} as Partial<IGearItem>);

  function handleSelectItem(event: React.ChangeEvent<HTMLSelectElement>) {
    let id = event.target.value;
    setSelectedItem(id ? items.find(i => i.id === id)! : {});
  }

  return (
    <Wrapper>
      <Icon>
        <img src={require(`assets/images/gears/${icon}.png`).default} alt={title} />
      </Icon>
      <Contents>
        <Title>{'name' in selectedItem ? selectedItem.name : title}</Title>
        {'id' in selectedItem &&
          <Stats>
            {'defMax' in selectedItem &&
              <div>Defense: {selectedItem.defMax}</div>
            }

            {'dmgMin' in selectedItem &&
              <div>One Hand Damage: {selectedItem.dmgMin}-{selectedItem.dmgMax}</div>
            }

            {'TwoHandedDmgMin' in selectedItem &&
              <div>Two Hand Damage: {selectedItem.TwoHandedDmgMin}-{selectedItem.TwoHandedDmgMax}</div>
            }

            {'levelReq' in selectedItem &&
              <div>Required Level: {selectedItem.levelReq || 1}</div>
            }

            {'strReq' in selectedItem &&
              <div>Required Strength: {selectedItem.strReq}</div>
            }

            {'dexReq' in selectedItem &&
              <div>Required Dexteity: {selectedItem.dexReq}</div>
            }

            {'sockets' in selectedItem &&
              <div>Max Sockets: {selectedItem.sockets}</div>
            }
          </Stats>
        }
        <select onChange={handleSelectItem}>
          <option value="">Select</option>
          {items.map(({ id, name }) =>
            <option value={id} key={id}>{name}</option>
          )}
        </select>
        <Props></Props>
        <Form></Form>
      </Contents>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  gap: 1em;
  padding: 1em;
  background: rgba(0 0 0 / .3);
`;

const Icon = styled.div`
  width: 60px;
  img {
    display: block;
  }
`;

const Title = styled.h2`
  padding-bottom: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
  color: var(--color-gold);
  border-bottom: 2px solid var(--color-gold);
  font-size: 2.2rem;
  text-transform: uppercase;
`;

const Contents = styled.div`
  flex: 1;
`;

const Stats = styled.ul`
`;

const Props = styled.div`
`;

const Form = styled.form``;
