import { Button, Header, Group, Text, Container, Image, createStyles } from "@mantine/core";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png"

export default function Navbar({appState} : any) {
  /**
   * @todo define appstate props based on database models
   * @todo use appstate props to change nav bar conditionally
   */
  return (
    <Header height={60} sx={{backgroundColor: "transparent", border: "none"}} >
      <Container style={{display: "flex", flexDirection : "row"}}>
        <Group>
          <Text component={Link} to="/signup">Sign Up</Text>
          <Text component={Link} to="/login">Login</Text>
        </Group>
        <Link to={"/"}>
          <Image src={Logo} width={50} height={50} />
        </Link>
      </Container>
    </Header>
  )
}