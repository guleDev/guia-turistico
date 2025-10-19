import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#34495e',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.84,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#4a6572',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 12,
    textAlign: 'left',
  },
  descricao_imagem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  descricao: {
    flex: 1,
    fontSize: 14,
    color: '#bdc3c7',
    lineHeight: 20,
    textAlign: 'left',
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#2c3e50',
  },
});