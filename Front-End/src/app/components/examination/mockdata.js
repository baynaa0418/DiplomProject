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
  
  // Mock data for patients
  export const mockPatients = [
    {
      id: 1,
      lastName: 'Батбаяр',
      firstName: 'Ариунболд',
      registerNum: 'УБ12345678',
      birthDate: '2001/07/06',
      age: 23,
      type: 'Оюутан',
      school: 'ШУТИС',
      profession: 'Программ хөгжүүлэгч',
      gender: 'Эрэгтэй',
      address: 'УБ, 3-р хороо, Даваа салбар, ...',
      phone: '9921 8857',
      healthIndicators: {
        bloodPressure: '120/80',
        heartRate: '72',
        temperature: '36.6',
        weight: '68',
        height: '175'
      }
    },
    {
      id: 2,
      lastName: 'Нямсүрэн',
      firstName: 'Зоригоо',
      registerNum: 'УБ87654321',
      birthDate: '2001/07/06',
      age: 23,
      type: 'Оюутан',
      school: 'МУИС',
      profession: 'Эдийн засагч',
      gender: 'Эмэгтэй',
      address: 'Дархан, Хороолол, Гудамж, Байр, ...',
      phone: '8015 8665',
      healthIndicators: {
        bloodPressure: '110/75',
        heartRate: '68',
        temperature: '36.4',
        weight: '72',
        height: '180'
      }
    },
    {
      id: 3,
      lastName: 'Батбаяр',
      firstName: 'Ганжигүүр',
      registerNum: 'УБ23456789',
      birthDate: '2001/07/06',
      age: 23,
      type: 'Оюутан',
      school: 'МУБИС',
      profession: 'Эрх зүйч',
      gender: 'Эрэгтэй',
      address: 'УБ, 5-р хороо, Байр, Тоот',
      phone: '9911 1234',
      healthIndicators: {
        bloodPressure: '130/85',
        heartRate: '75',
        temperature: '36.8',
        weight: '80',
        height: '178'
      }
    },
    {
      id: 4,
      lastName: 'Батмэнд',
      firstName: 'Мөнххүлэг',
      registerNum: 'УБ34567890',
      birthDate: '2001/07/06',
      age: 23,
      type: 'Багш',
      school: 'МУИС',
      profession: 'Математикийн багш',
      gender: 'Эрэгтэй',
      address: 'Дархан, Хороолол, Гудамж, Байр, Тоот',
      phone: '8888 8001',
      healthIndicators: {
        bloodPressure: '125/82',
        heartRate: '70',
        temperature: '36.5',
        weight: '75',
        height: '172'
      }
    },
    {
      id: 5,
      lastName: 'Лувсандорж',
      firstName: 'Ганбаатар',
      registerNum: 'УБ45678901',
      birthDate: '2001/07/06',
      age: 23,
      type: 'Ажилтан',
      school: 'МУИС',
      profession: 'Санхүүгийн мэргэжилтэн',
      gender: 'Эрэгтэй',
      address: 'Дархан, Хороолол, Гудамж, Байр, Тоот',
      phone: '8088 8001',
      healthIndicators: {
        bloodPressure: '118/78',
        heartRate: '65',
        temperature: '36.7',
        weight: '70',
        height: '176'
      }
    }
  ];
  
  // Helper functions for mock data
  export const findPatientById = (id) => {
    return mockPatients.find(patient => patient.id === id);
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