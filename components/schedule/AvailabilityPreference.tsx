import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import mockReservationPreference from "@/mocks/mockReservationPreference";
import { Colors } from "@/constants/Colors";
import FuturePreferenceModal from "./FuturePreferenceModal";
import NoticeHoursModal from "./NoticeHoursModal";

interface ReservationPreference {
  futureDays: number;
  minimumNoticeHours: number;
  setFutureDays: (days: number) => void;
  setMinimumNoticeHours: (hours: number) => void;
}

function AvailabilityPreference({
  futureDays,
  minimumNoticeHours,
  setFutureDays,
  setMinimumNoticeHours,
}: ReservationPreference) {
  const ColorScheme = useColorScheme();
  const theme = Colors[ColorScheme || "light"];

  const [isEditingFutureDays, setIsEditingFutureDays] = useState(false);
  const [isEditingNoticeHours, setIsEditingNoticeHours] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <Text>Invitees can schedule up to</Text>
        <TouchableOpacity
          onPress={() => {
            setIsEditingFutureDays(true);
            setIsEditingNoticeHours(false);
          }}
        >
          <Text style={[styles.editableText, { color: theme.link }]}>
            {futureDays} days
          </Text>
        </TouchableOpacity>
        <Text>into the future with</Text>
        <Text>at least</Text>
        <TouchableOpacity onPress={() => {
          setIsEditingNoticeHours(true);
          setIsEditingFutureDays(false);
        }}>
          <Text style={[styles.editableText, { color: theme.link }]}>
            {minimumNoticeHours} hours
          </Text>
        </TouchableOpacity>
        <Text>notice</Text>
      </View>
      {isEditingFutureDays && (
        <FuturePreferenceModal
          futureDays={futureDays}
          setFutureDays={setFutureDays}
        />
      )}
      {isEditingNoticeHours && (
        <NoticeHoursModal
          minimumNoticeHours={minimumNoticeHours}
          setMinimumNoticeHours={setMinimumNoticeHours}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  editableText: {
    marginHorizontal: 4,
  },
});

export default AvailabilityPreference;
