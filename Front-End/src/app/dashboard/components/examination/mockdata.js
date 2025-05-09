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
  
  // Mock patients data
  export const mockPatients = [
    {
      id: 'ТАВ82520019',
      registerNum: 'ТАВ82520019',
      firstName: 'Дэлгэрцэцэг',
      lastName: 'Батболд',
      age: '38',
      gender: '2-р баяр',
      idNumber: '965567788',
      phoneNumber: '99887766',
      department: 'Ажилтан',
      doctorType: 'Үйлчлэгч',
      section: 'Эмэгтэй'
    },
    {
      id: 'ТАД12322020',
      registerNum: 'ТАД12322020',
      firstName: 'Наранчимэг',
      lastName: 'Нямжав',
      age: '45',
      gender: 'Хөрөнгө',
      idNumber: '987654321',
      phoneNumber: '88776655',
      department: 'Ажилтан',
      doctorType: 'Үйлчлэгч',
      section: 'Эмэгтэй'
    },
    {
      id: 'ТАБ23220020',
      registerNum: 'ТАБ23220020',
      firstName: 'Эрдэнэ',
      lastName: 'Батболд',
      age: '29',
      gender: 'Ажил/ҮЙ - Бэлэн',
      idNumber: '123456789',
      phoneNumber: '77665544',
      department: 'Үйлчилгээ',
      doctorType: 'Үйлчлэгч',
      section: 'Эрэгтэй'
    }
  ];