export const MockImages: Record<string, any> = {
  // Aquí usamos 'require' estáticamente. Metro resolverá estas rutas en tiempo de compilación.
  'monsquera': require('../../assets/images/mocks/monsquera.png'),
  'helecho': require('../../assets/images/mocks/helecho.png'),
  'potos': require('../../assets/images/mocks/potos.png'),
  'palo_de_agua': require('../../assets/images/mocks/palo_de_agua.png'),
};

export const getPlantImage = (assetId: string | null) => {
  if (!assetId || !MockImages[assetId]) {
    return null;
  }
  return MockImages[assetId];
};
