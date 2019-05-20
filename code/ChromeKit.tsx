import * as React from "react"
import { useState } from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import styled, { css } from "styled-components"
import MaterialIcon from "material-icons-react"

addPropertyControls(ChromeAndroid, {
    link: {
        type: ControlType.String,
        title: "Link",
        defaultValue: "https://framer.com",
    },
    tabs: {
        type: ControlType.Number,
        title: "Open Tabs",
        defaultValue: 10,
    },
    themecolor: {
        type: ControlType.Color,
        title: "Theme Color",
        defaultValue: "#FFFFFF",
    },
    appearance: {
        type: ControlType.Enum,
        options: ["dark", "light"],
        optionTitles: ["Dark", "Light"],
        title: "Appearance",
        defaultValue: "light",
    },
})

ChromeAndroid.defaultProps = {
    width: 411,
    height: 70,
}

const getTime = () => {
    const today = new Date()
    return today.toLocaleTimeString().slice(0, -3)
}

const StatusBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  height: 20px;
  padding: 0px 8px;
  font-size: 14px;
`

const ChromeUI = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0px 8px;
`

const AddressBar = styled.div`
  display: flex;
  background-color: rgba(230, 230, 230, 0.3);
  width: 100%;
  border-radius: 99px;
  align-items: center;
  padding: 8px 10px;
  overflow: hidden;

  p {
    display: inline-block;
    white-space: nowrap;
    padding-left: 6px;
    font-size: 16px;
  }
`

const OpenTabs = styled.div`
  border-radius: 4px;
  margin: 0px 16px;
  font-size: 10px;
`

export function ChromeAndroid(props) {
    const [time, setTime] = useState(getTime)
    console.log(props)

    setInterval(() => {
        setTime(getTime)
    }, 1000)

    return (
        <Container
            width={props.width}
            height={props.height}
            background={props.themecolor}
            appearance={props.appearance}
        >
            <StatusBar>
                <MaterialIcon size="tiny" icon="network_wifi" />
                <MaterialIcon size="tiny" icon="signal_cellular_4_bar" />
                <MaterialIcon size="tiny" icon="battery_full" />
                <p>{time}</p>
            </StatusBar>
            <ChromeUI>
                <AddressBar>
                    <MaterialIcon icon="lock" size="tiny" />
                    <p>{props.link}</p>
                </AddressBar>
                <OpenTabs>
                    <p>{props.tabs}</p>
                </OpenTabs>
                <MaterialIcon icon="more_vert" />
            </ChromeUI>
        </Container>
    )
}

const Container = styled(Frame)`
  box-shadow: 0px 5px 15px -5px rgba(0, 0, 0, 0.1);

  p {
    margin: 0;
    color: ${props => (props.appearance === "light" ? "#3c4040" : "#fff")};
  }

  ${OpenTabs} {
    border: 2px solid
      ${props => (props.appearance === "light" ? "#3c4040" : "#fff")};

    p {
      color: ${props => (props.appearance === "light" ? "#3c4040" : "#fff")};
      margin: 1px;
      font-weight: 800;
    }
  }

  ${StatusBar} {
    .material-icons {
      color: ${props => (props.appearance === "light" ? "#646464" : "#fff")};
      font-size: 14px;
    }
  }

  ${AddressBar} {
    .material-icons {
      color: ${props =>
          props.background === "#fff" || "#ffffff" ? "#177B3A" : "#fff"};
    }
  }

  ${ChromeUI} {
    .material-icons {
      color: ${props => (props.appearance === "light" ? "#3c4040" : "#fff")};
    }
  }
`
