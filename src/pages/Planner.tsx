import { useState, createContext, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import Stages from "components/planner/Stages";
import Tabs from "components/planner/Tabs";
import { PageTitle } from "components/ui/Headings";
import plannerInit from "config/planner";
import reduceSkills from "reducers/skills";
import attrsInit from "config/attrs";
import reduceAttrs from "reducers/attrs";

//context
export const PlannerContext = createContext({} as IPlannerContext);


// TODO: CONSIDER USING THE CONTEXT AS A CUSTOM HOOK
// export const usePlanner = () => useContext(PlannerContext);
// const { ...props } = usePlanner();


const gearsInit: IGear[] = [
  {
    type: 'ARMOR',
    props: {
      strength: 10,
      dexterity: 5
    }
  },
  {
    type: 'WEAPON',
    props: {
      strength: 20
    }
  },
  {
    type: 'AMULET',
    props: {
      allAttrs: 5
    }
  }
]

function reduceGearAttrProps(attr: keyof IGearProps, gearArr: IGear[]) {
  return gearArr
    .filter(g => g.props[attr!])
    .flatMap(g => g.props[attr!])
    .reduce((a, b) => a! + b!, 0);
}

export default function Planner() {
  //route params
  const charClass = useParams<{ character: string }>().character;

  //state
  const [planner, setPlanner] = useState(plannerInit);
  const [characterData, setCharacterData] = useState({} as ICharacterData);


  const [level, setLevel] = useState(1);
  const [attrs, dispatchAttrs] = useReducer(reduceAttrs, attrsInit);
  const [attrPoints, setAttrPoints] = useState(0);


  const [skills, dispatchSkills] = useReducer(reduceSkills, []);
  const [skillTabs, setSkillTabs] = useState([] as ISkillTab[]);
  const [skillPoints, setSkillPoints] = useState(0);

  const [gears, setGears] = useState(gearsInit);

  const [isLoading, setIsLoading] = useState(false);

  //props
  const plannerContextProps: IPlannerContext = {
    characterData,

    planner, setPlanner,

    level, setLevel,
    attrs, dispatchAttrs,
    attrPoints, setAttrPoints,

    skills, dispatchSkills,
    skillTabs, setSkillTabs,
    skillPoints, setSkillPoints
  }

  //on mount: retrieve character data
  useEffect(() => {
    setIsLoading(true);
    (async function () {
      try {
        const response = await fetch(`https://d2calc-24ee1-default-rtdb.firebaseio.com/class/${charClass}.json`);
        const data = await response.json();
        const { skills, attributes }: ICharacterData = data;

        setCharacterData(data);

        dispatchAttrs({
          type: 'RESET',
          payload: {
            initialState: {
              strength: {
                ...attrsInit.strength,
                base: attributes.strength,
                total: attributes.strength
              },
              dexterity: {
                ...attrsInit.dexterity,
                base: attributes.dexterity,
                total: attributes.dexterity
              },
              vitality: {
                ...attrsInit.vitality,
                base: attributes.vitality,
                total: attributes.vitality
              },
              energy: {
                ...attrsInit.energy,
                base: attributes.energy,
                total: attributes.energy
              }
            }
          }
        });

        let attrs: Array<keyof IAttrs> = ['strength', 'dexterity', 'vitality', 'energy'];

        attrs.forEach(a => {
          dispatchAttrs({
            type: 'ADD',
            payload: {
              attr: a,
              prop: 'extras',
              batch: reduceGearAttrProps(a, gears)
            }
          });
        });


        dispatchSkills({
          type: 'INIT',
          payload: {
            initialState: skills
          }
        });

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    })();
  }, [charClass, gears]);


  return (
    <>
      <PageTitle>{level > 1 && `Level ${level} `}{charClass}</PageTitle>
      {isLoading ?
        <div>LOADING DATA...</div>
        :
        <PlannerContext.Provider value={plannerContextProps}>
          <Tabs />
          <Stages />
        </PlannerContext.Provider>
      }
    </>
  )
}
