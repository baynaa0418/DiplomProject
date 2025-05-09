// Mock diagnosis options
export const diagnosisOptions = [
    { code: 'A01.1', label: 'A ижбанадад' },
    { code: 'A01.3', label: 'C ижбанадад' },
    { code: 'A04.8', label: 'Үүсгэгч нь тогтоогдоогүй гэдэсний бусад бактери халдвар' },
    { code: 'B02.0', label: 'Херпес зостер сэтгэцийн хүндрэлгүй' },
    { code: 'J00', label: 'Ханиад' },
  ];
  
  // Mock action options
  export const actionOptions = [
    { code: 'Z-01', label: 'Анхан үзлэг' },
    { code: 'Z-18', label: 'Давтан үзлэг' },
    { code: 'Z-20', label: 'Ерөнхий шинжилгээ' },
    { code: 'Z-40', label: 'Тусгай эмчилгээ' },
    { code: 'Z-1.8', label: 'Давтан үзлэг, тусгай' },
  ];
  
  // Generate MongoDB ObjectId-like string
  const generateObjectId = () => {
    const timestamp = Math.floor(Date.now() / 1000).toString(16);
    const randomPart = Math.random().toString(16).substring(2, 10);
    return `${timestamp}${randomPart}`;
  };
  
  // Mock patients data with dynamic IDs
  export const mockPatients = [
    {
      _id: generateObjectId(),
      id: 'ТАВ82520019',
      registerNum: 'ТАВ82520019',
      firstName: 'Дэлгэрцэцэг',
      lastName: 'Батболд',
      age: '38',
      gender: 'Эмэгтэй',
      type: 'Анхан',
      school: 'МУИС',
      profession: 'Эмч',
      phone: '99887766',
      birthDate: '1985-05-15',
      createdAt: new Date('2024-01-15').toISOString(),
      updatedAt: new Date('2024-01-15').toISOString()
    },
    {
      _id: generateObjectId(),
      id: 'ТАД12322020',
      registerNum: 'ТАД12322020',
      firstName: 'Наранчимэг',
      lastName: 'Нямжав',
      age: '45',
      gender: 'Эмэгтэй',
      type: 'Давтан',
      school: 'МУБИС',
      profession: 'Багш',
      phone: '88776655',
      birthDate: '1978-08-20',
      createdAt: new Date('2024-01-16').toISOString(),
      updatedAt: new Date('2024-01-16').toISOString()
    },
    {
      _id: generateObjectId(),
      id: 'ТАБ23220020',
      registerNum: 'ТАБ23220020',
      firstName: 'Эрдэнэ',
      lastName: 'Батболд',
      age: '29',
      gender: 'Эрэгтэй',
      type: 'Анхан',
      school: 'МУБИС',
      profession: 'Инженер',
      phone: '77665544',
      birthDate: '1994-03-10',
      createdAt: new Date('2024-01-17').toISOString(),
      updatedAt: new Date('2024-01-17').toISOString()
    }
  ];
  
  // Helper functions for mock data
  export const findPatientById = (id) => {
    return mockPatients.find(patient => patient._id === id || patient.id === id);
  };
  
  export const findPatientByRegisterNum = (registerNum) => {
    return mockPatients.find(patient => patient.registerNum === registerNum);
  };
  
  export const addPatient = (patientData) => {
    const newPatient = {
      _id: generateObjectId(),
      ...patientData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockPatients.push(newPatient);
    return newPatient;
  };
  
  export const updatePatient = (id, updateData) => {
    const index = mockPatients.findIndex(patient => patient._id === id || patient.id === id);
    if (index !== -1) {
      mockPatients[index] = {
        ...mockPatients[index],
        ...updateData,
        updatedAt: new Date().toISOString()
      };
      return mockPatients[index];
    }
    return null;
  };
  
  export const deletePatient = (id) => {
    const index = mockPatients.findIndex(patient => patient._id === id || patient.id === id);
    if (index !== -1) {
      const deletedPatient = mockPatients[index];
      mockPatients.splice(index, 1);
      return deletedPatient;
    }
    return null;
  };