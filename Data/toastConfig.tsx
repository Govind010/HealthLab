import { View, Text, StyleSheet } from "react-native";

export const toastConfig = {
  success: ({ text1, text2 }: any) => (
    <View style={[styles.toastBase, styles.successBg]}>
      <Text style={styles.title}>{text1}</Text>
      {text2 ? <Text style={styles.subtitle}>{text2}</Text> : null}
    </View>
  ),

  error: ({ text1, text2 }: any) => (
    <View style={[styles.toastBase, styles.errorBg]}>
      <Text style={styles.title}>{text1}</Text>
      {text2 ? <Text style={styles.subtitle}>{text2}</Text> : null}
    </View>
  ),
};

const styles = StyleSheet.create({
  toastBase: {
    width: "90%",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 14,
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },

  successBg: {
    borderLeftWidth: 5,
    borderLeftColor: "#00A57A", // green like your Total Amount
  },

  errorBg: {
    borderLeftWidth: 5,
    borderLeftColor: "#E53935", // modern red
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 2,
  },

  subtitle: {
    fontSize: 13,
    color: "#6F6F6F",
  },
});
