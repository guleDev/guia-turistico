import { ButtonProps } from "@data/types";

import { Text, TouchableOpacity } from "react-native";
import { styles } from "./Button.style";

export default function Button({children, ...props}: ButtonProps){
    return(
        <TouchableOpacity onPress={props.action} style={styles.botao} activeOpacity={0.6}>
            <Text style={styles.titulo}>{children}</Text>
        </TouchableOpacity>   
    )
}