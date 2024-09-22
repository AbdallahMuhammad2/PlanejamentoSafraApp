import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addEntry } from '../../store/FinancialSlice';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation } from '@react-navigation/native';

interface FormValues {
  type: 'entrada' | 'saida';
  category: string;
  amount: string;
  date: string;
  description?: string;
}

const validationSchema = Yup.object().shape({
  type: Yup.string().oneOf(['entrada', 'saida']).required('Tipo é obrigatório'),
  category: Yup.string().required('Categoria é obrigatória'),
  amount: Yup.number().positive('Valor deve ser positivo').required('Valor é obrigatório'),
  date: Yup.date().required('Data é obrigatória'),
  description: Yup.string(),
});

const AddFinancialEntryScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const initialValues: FormValues = {
    type: 'entrada',
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
  };

  const handleSubmit = (values: FormValues) => {
    const newEntry = {
      id: uuidv4().toString(),
      type: values.type,
      category: values.category,
      amount: parseFloat(values.amount),
      date: values.date,
      description: values.description,
    };
    dispatch(addEntry(newEntry));
    navigation.goBack();
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
        <View style={styles.container}>
          <RadioButton.Group
            onValueChange={value => setFieldValue('type', value)}
            value={values.type}
          >
            <View style={styles.radioRow}>
              <RadioButton value="entrada" />
              <Text style={styles.radioLabel}>Entrada</Text>
              <RadioButton value="saida" />
              <Text style={styles.radioLabel}>Saída</Text>
            </View>
          </RadioButton.Group>
          {errors.type && touched.type && <Text style={styles.error}>{errors.type}</Text>}

          <TextInput
            label="Categoria"
            onChangeText={handleChange('category')}
            onBlur={handleBlur('category')}
            value={values.category}
            mode="outlined"
            style={styles.input}
          />
          {errors.category && touched.category && <Text style={styles.error}>{errors.category}</Text>}

          <TextInput
            label="Valor"
            onChangeText={handleChange('amount')}
            onBlur={handleBlur('amount')}
            value={values.amount}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />
          {errors.amount && touched.amount && <Text style={styles.error}>{errors.amount}</Text>}

          <TextInput
            label="Data"
            onChangeText={handleChange('date')}
            onBlur={handleBlur('date')}
            value={values.date}
            mode="outlined"
            style={styles.input}
            placeholder="AAAA-MM-DD"
          />
          {errors.date && touched.date && <Text style={styles.error}>{errors.date}</Text>}

          <TextInput
            label="Descrição"
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
            mode="outlined"
            style={styles.input}
            multiline
          />
          {errors.description && touched.description && <Text style={styles.error}>{errors.description}</Text>}

          <Button mode="contained" onPress={() => handleSubmit()} style={styles.button}>
            Adicionar
          </Button>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioLabel: {
    marginRight: 20,
    fontSize: 16,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default AddFinancialEntryScreen;
