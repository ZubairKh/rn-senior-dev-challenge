import { Image } from "expo-image";
import { Platform, Pressable, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/constants/routes";

export default function HomeScreen() {
  const router = useRouter();
  const {
    state: { user, isProcessing },
    logout,
  } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace(ROUTES.auth.login);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/+not-found">
          <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        </Link>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">
            npm run reset-project
          </ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.sessionContainer}>
        <ThemedText>
          Logged in as <ThemedText type="defaultSemiBold">{user?.email ?? "Unknown"}</ThemedText>
        </ThemedText>
        <Pressable
          accessibilityRole="button"
          onPress={handleLogout}
          disabled={isProcessing}
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.logoutButtonPressed,
            isProcessing && styles.logoutButtonDisabled,
          ]}
        >
          <ThemedText type="defaultSemiBold" style={styles.logoutButtonText}>
            {isProcessing ? "Signing out…" : "Sign out"}
          </ThemedText>
        </Pressable>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  sessionContainer: {
    marginTop: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(125,125,125,0.24)",
    padding: 16,
    borderRadius: 16,
  },
  logoutButton: {
    backgroundColor: "#0a7ea4",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutButtonPressed: {
    opacity: 0.85,
  },
  logoutButtonDisabled: {
    opacity: 0.6,
  },
  logoutButtonText: {
    color: "#fff",
  },
});
