import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#3d825a',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.84,
    elevation: 5,
  },
  titulo: {
    color: '#ecf0f1',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

// Estilos para diferentes variantes (opcional)
export const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: '#3498db',
  },
  secondary: {
    backgroundColor: '#95a5a6',
  },
  success: {
    backgroundColor: '#27ae60',
  },
  danger: {
    backgroundColor: '#e74c3c',
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minHeight: 52,
  },
});

// Estilos para texto das variantes
export const textVariantStyles = StyleSheet.create({
  primary: {
    color: '#ffffff',
  },
  secondary: {
    color: '#ffffff',
  },
  success: {
    color: '#ffffff',
  },
  danger: {
    color: '#ffffff',
  },
  small: {
    fontSize: 14,
  },
  large: {
    fontSize: 18,
  },
});