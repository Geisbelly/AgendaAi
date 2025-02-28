import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import {styles} from "@/style/style";

interface ToggleButtonProps {
    selected: string;
    onChange: (value: "month" | "week") => void;
  }
  
  const ToggleButton: React.FC<ToggleButtonProps> = ({ selected, onChange }) => {
  return (
    <View style={styles.toggleContainer}>

      <TouchableOpacity onPress={() => onChange("month")}>
        <View style={[styles.option, selected === "month" && styles.activeOption]}>
            <Text style={[styles.optionText, selected === "month" && styles.activeOptionText]}>Mês</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onChange("week")}>
        <View style={[styles.option, selected === "week" && styles.activeOption]}>
            <Text style={[styles.optionText, selected === "week" && styles.activeOptionText]}>Semana</Text>
        </View>
      </TouchableOpacity>
      
    </View>
  );
};


  

export default ToggleButton;
