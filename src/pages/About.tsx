import { useParams } from "react-router";

const About = () => {
  let params = useParams<any>();
  return <h1>{`${params.cl}`}</h1>
}

export default About