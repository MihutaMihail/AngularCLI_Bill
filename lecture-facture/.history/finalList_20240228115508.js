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
      document: 'Détails de Puissance (POWER_DETAILS)',
      fields: [
        { name: 'Puissance Souscrite (SUBSCRIBED_POWER)', key: 'SUBSCRIBED_POWER' },
      ],
    },
    {
      document: 'Prochaines Étapes (NEXT_STEPS)',
      fields: [
        { name: 'Prochaine Facture (NEXT_INVOICE_DATE)', key: 'NEXT_INVOICE_DATE' },
        { name: 'Relève Automatique du Compteur (AUTOMATIC_METER_READING)', key: 'AUTOMATIC_METER_READING' },
      ],
    },
    {
      document: 'Prélèvement Automatique (DIRECT_DEBIT_DETAILS)',
      fields: [
        { name: 'Montant à Prélever (AMOUNT_TO_DEBIT)', key: 'AMOUNT_TO_DEBIT' },
        { name: 'Date de Prélèvement (DEBIT_DATE)', key: 'DEBIT_DATE' },
        { name: 'Titulaire du Compte (ACCOUNT_HOLDER)', key: 'ACCOUNT_HOLDER' },
        { name: 'Numéro de Compte (ACCOUNT_NUMBER)', key: 'ACCOUNT_NUMBER' },
      ],
    },
    {
      document: 'Services Financiers et Comptables (FINANCIAL_ACCOUNTING_SERVICES)',
      fields: [
        { name: 'Automatisation de Traitement des Factures (INVOICE_AUTOMATION)', key: 'INVOICE_AUTOMATION' },
        { name: 'Suivi des Paiements (PAYMENT_TRACKING)', key: 'PAYMENT_TRACKING' },
        { name: 'Génération de Rapports d\'Analyse Financière (FINANCIAL_REPORTS)', key: 'FINANCIAL_REPORTS' },
        { name: 'Objectif (FINANCIAL_SERVICES_GOAL)', key: 'FINANCIAL_SERVICES_GOAL' },
      ],
    },
    {
      document: 'Données Additionnelles',
      fields: [
        { name: 'Type de Document (DOCUMENT_TYPE)', key: 'DOCUMENT_TYPE' },
        { name: 'Langue du Document (DOCUMENT_LANGUAGE)', key: 'DOCUMENT_LANGUAGE' },
        { name: 'Fournisseur d\'Énergie (ENERGY_PROVIDER)', key: 'ENERGY_PROVIDER' },
        { name: 'Période de Facturation (BILLING_PERIOD)', key: 'BILLING_PERIOD' },
        { name: 'Adresse éditée (EDITED_ADDRESS)', key: 'EDITED_ADDRESS' },
      ],
    },
  ];
  
  module.exports = finalList;
