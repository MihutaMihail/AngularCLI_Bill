// finalList.js

const finalList = [
    {
      document: 'Facture d\'énergie (DOM_FACTURE_ENERGIE)',
      fields: [
        { name: 'Date du Document (DOCUMENT_DATE)', key: 'DOCUMENT_DATE' },
        { name: 'Nom complet du titulaire (FULL_NAME)', key: 'FULL_NAME' },
        { name: 'Adresse postale complète (POSTAL_ADDRESS_WITH_NAME)', key: 'POSTAL_ADDRESS_WITH_NAME' },
        { name: 'Rue (STREET)', key: 'STREET' },
        { name: 'Code postal et Ville (ZIPCODE_AND_TOWN)', key: 'ZIPCODE_AND_TOWN' },
      ],
    },
    {
      document: 'Détails du Compteur (METER_DETAILS)',
      fields: [
        { name: 'Numéro de Compteur (METER_NUMBER)', key: 'METER_NUMBER' },
        { name: 'Type de Compteur (METER_TYPE)', key: 'METER_TYPE' },
        { name: 'Index de Début (START_INDEX)', key: 'START_INDEX' },
        { name: 'Index de Fin (END_INDEX)', key: 'END_INDEX' },
        { name: 'Consommation Totale (TOTAL_CONSUMPTION)', key: 'TOTAL_CONSUMPTION' },
      ],
    },
    {
      document: 'Prochaines Étapes (NEXT_STEPS)',
      fields: [
        { name: 'Prochaine Facture (NEXT_INVOICE_DATE)', key: 'NEXT_INVOICE_DATE' },
        { name: 'Relève Automatique du Compteur (AUTOMATIC_METER_READING)', key: 'AUTOMATIC_METER_READING' },
      ],
    },   
  ];
  
  module.exports = finalList;
