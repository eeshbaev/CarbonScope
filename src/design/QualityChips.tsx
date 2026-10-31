import { useLanguage } from '../context/LanguageContext';
import type { DataQuality } from '../types';
import { Segmented } from './Segmented';

/** Data quality of one source line: metered · invoice · estimate. */
export function QualityChips({ value, onChange }: { value: DataQuality; onChange: (q: DataQuality) => void }) {
  const { t } = useLanguage();
  return (
    <Segmented<DataQuality>
      size="sm"
      accessibilityLabel={t.quality.label}
      value={value}
      onChange={onChange}
      options={[
        { value: 'measured', label: t.quality.measured },
        { value: 'invoice', label: t.quality.invoice },
        { value: 'estimated', label: t.quality.estimated },
      ]}
    />
  );
}
