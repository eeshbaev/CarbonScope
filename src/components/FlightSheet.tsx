import { PlaneTakeoff, X } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../context/LanguageContext';
import type { Airport } from '../data/airports';
import { haptics } from '../design/haptics';
import { useLayout } from '../design/layout';
import { colors, radii } from '../theme';
import { formatAppNumber } from '../utils/appLocale';
import { searchAirports, tripPassengerKm } from '../utils/flights';
import { Button } from './Button';
import { NumberField } from './NumberField';

function AirportPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Airport | null;
  onChange: (a: Airport | null) => void;
}) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const results = useMemo(() => (value ? [] : searchAirports(query, 6)), [query, value]);
  return (
    <View style={styles.picker}>
      <Text style={styles.label}>{label}</Text>
      {value ? (
        <Pressable
          style={styles.selected}
          onPress={() => {
            onChange(null);
            setQuery('');
          }}
          accessibilityRole="button"
          accessibilityHint={t.flights.search}
        >
          <Text style={styles.iata}>{value.iata}</Text>
          <Text style={styles.airportName} numberOfLines={1}>
            {value.city} · {value.name}
          </Text>
          <X size={18} color={colors.inkTertiary} />
        </Pressable>
      ) : (
        <>
          <TextInput
            style={styles.input}
            value={query}
            onChangeText={setQuery}
            placeholder={t.flights.search}
            placeholderTextColor={colors.inkTertiary}
            autoCorrect={false}
            autoCapitalize="none"
            accessibilityLabel={label}
          />
          {results.map((a) => (
            <Pressable
              key={a.iata}
              style={styles.result}
              onPress={() => {
                haptics.selection();
                onChange(a);
              }}
              accessibilityRole="button"
            >
              <Text style={styles.iata}>{a.iata}</Text>
              <Text style={styles.airportName} numberOfLines={1}>
                {a.city} · {a.name} · {a.country}
              </Text>
            </Pressable>
          ))}
        </>
      )}
    </View>
  );
}

/** Add business-travel flights by airport pair; adds passenger-km to short- or long-haul. */
export function FlightSheet({
  visible,
  onClose,
  onAdd,
}: {
  visible: boolean;
  onClose: () => void;
  onAdd: (haul: 'short' | 'long', passengerKm: number) => void;
}) {
  const { t, locale } = useLanguage();
  const insets = useSafeAreaInsets();
  const layout = useLayout();
  const [from, setFrom] = useState<Airport | null>(null);
  const [to, setTo] = useState<Airport | null>(null);
  const [passengers, setPassengers] = useState<number | null>(1);
  const [returnTrip, setReturnTrip] = useState(true);

  const trip =
    from && to && from.iata !== to.iata
      ? tripPassengerKm({ from, to, passengers: passengers ?? 1, returnTrip })
      : null;

  const reset = () => {
    setFrom(null);
    setTo(null);
    setPassengers(1);
    setReturnTrip(true);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={[styles.backdrop, layout.twoPane && styles.backdropCentered]}>
        <View
          style={[
            styles.sheet,
            layout.twoPane ? styles.dialog : { paddingBottom: Math.max(insets.bottom, 16) },
          ]}
        >
          <View style={styles.header}>
            <PlaneTakeoff size={20} color={colors.brand} strokeWidth={1.75} />
            <Text style={styles.title}>{t.flights.title}</Text>
            <Pressable onPress={onClose} hitSlop={12} accessibilityRole="button" accessibilityLabel={t.common.cancel}>
              <X size={22} color={colors.inkSecondary} />
            </Pressable>
          </View>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.body}>
            <Text style={styles.hint}>{t.flights.hint}</Text>
            <AirportPicker label={t.flights.from} value={from} onChange={setFrom} />
            <AirportPicker label={t.flights.to} value={to} onChange={setTo} />
            <NumberField
              label={t.flights.passengers}
              value={passengers}
              nullable
              onChange={setPassengers}
            />
            <View style={styles.switchRow}>
              <Text style={styles.label}>{t.flights.returnTrip}</Text>
              <Switch
                value={returnTrip}
                onValueChange={setReturnTrip}
                trackColor={{ false: colors.hairline, true: colors.brand }}
              />
            </View>
            {trip ? (
              <Text style={styles.result} accessibilityLiveRegion="polite">
                {t.flights.result
                  .replace('{km}', formatAppNumber(Math.round(trip.km), locale))
                  .replace('{pkm}', formatAppNumber(Math.round(trip.passengerKm), locale))
                  .replace('{haul}', trip.haul === 'short' ? t.flights.short : t.flights.long)}
              </Text>
            ) : null}
          </ScrollView>
          <Button
            title={t.flights.add}
            disabled={!trip}
            onPress={() => {
              if (!trip) return;
              onAdd(trip.haul, Math.round(trip.passengerKm));
              haptics.success();
              reset();
              onClose();
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(22,32,27,0.35)' },
  backdropCentered: { justifyContent: 'center', alignItems: 'center' },
  sheet: {
    backgroundColor: colors.canvas,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    padding: 20,
    maxHeight: '92%',
    gap: 12,
  },
  dialog: { borderRadius: radii.xl, width: 560, maxWidth: '92%' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  title: { flex: 1, fontSize: 20, fontWeight: '600', color: colors.ink },
  body: { gap: 12, paddingBottom: 8 },
  hint: { fontSize: 13, lineHeight: 18, color: colors.inkSecondary },
  picker: { gap: 6 },
  label: { fontSize: 14, fontWeight: '600', color: colors.ink },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radii.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.ink,
  },
  selected: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.brandTint,
    borderRadius: radii.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.hairline,
    fontSize: 15,
    color: colors.ink,
    fontWeight: '600',
  },
  iata: { fontWeight: '700', color: colors.ink, fontVariant: ['tabular-nums'], width: 44 },
  airportName: { flex: 1, color: colors.inkSecondary, fontSize: 14 },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});
