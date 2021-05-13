import { RouteComponentProps } from "react-router";

export interface EventComponentProps {
    // event: {
    //     id: number;
    //     title: string;
    //     type: string;
    //     description: string;
    //     isLive: boolean,
    // };
    event: any;
}

export interface EventComponentWithRouteProps extends RouteComponentProps {
    // event: {
    //     id: number;
    //     title: string;
    //     type: string;
    //     description: string;
    //     isLive: boolean,
    // };
    event: any;
}