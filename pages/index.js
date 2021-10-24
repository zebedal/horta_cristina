import Hero from "../components/homepage/Hero"
import Welcome from "../components/homepage/Welcome"
import Cabazes from "../components/homepage/Cabazes"
import Destaques from "../components/homepage/Destaques"
import { Fragment } from "react"

export default function Homepage({ authenticated }) {


  return (
    <Fragment>
      <Hero />
      <Welcome />
      <Cabazes />
      <Destaques />
    </Fragment>
  )
}

/* export async function getServerSideProps(context) {

  const session = await getSession({req: context.req})

  if (!session) {
      return {
          props:{
            authenticated: false
          }
      }
  }

  else {
    return {
      props: {
        authenticated: true
      }
    }
  }

}
 */