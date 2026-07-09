export const requiredRule=value=> !!String(value ?? '').trim() || 'this field is required'
