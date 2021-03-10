import { useState, useEffect } from 'react';
import moment from 'moment';

export function inputBind(initValue: string) {
  const [value, setValue] = useState(initValue);
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  return { value, setValue, onChange };
}

export function dateBind(initValue: []) {
  let _defaultValue: any = undefined;
  if (initValue.length > 0) {
    _defaultValue = initValue.map((item) => {
      return moment.isMoment(item) ? item : moment(item);
    });
  }
  const [value, setValue] = useState(_defaultValue);
  const [formatValue, setformatValue] = useState([]);
  const onChange = (e: any) => {
    setValue(e);
  };
  useEffect(() => {
    if (value && value.length > 0) {
      const _formatValue = value.map((item: any) => {
        return moment.isMoment(item)
          ? item.format('YYYY-MM-DD')
          : moment(item).format('YYYY-MM-DD');
      });
      setformatValue(_formatValue);
    } else {
      setformatValue([]);
    }
  }, [value]);

  return { value, formatValue, setValue, setformatValue, onChange };
}

export function propagationBind(initValue: number) {
  const [value, setValue] = useState(initValue);
  const onChange = (_number: number) => {
    setValue(_number);
  };
  return { value, setValue, onChange };
}
