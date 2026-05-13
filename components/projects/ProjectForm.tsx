'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useFormik, FieldArray, FormikProvider, getIn } from 'formik';
import * as Yup from 'yup';
import CloudinaryUpload from '@/components/ui/CloudinaryUpload';
import { 
  ChevronLeft, 
  Save, 
  Trash2, 
  Image as ImageIcon, 
  ListChecks, 
  Info,
  DollarSign,
  Tag,
  Layers,
  History,
  HelpCircle,
  Package
} from 'lucide-react';
import Link from 'next/link';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  shortDescription: Yup.string().required('Short description is required'),
  fullDescription: Yup.string().required('Full description is required'),
  price: Yup.number().min(0, 'Price must be positive').required('Price is required'),
  category: Yup.string().required('Category is required'),
  thumbnail: Yup.string().required('Thumbnail is required'),
});

export interface ProjectFormValues {
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  discountPrice: number;
  discountPercentage: number;
  category: string;
  tags: string[];
  thumbnail: string;
  images: string[];
  demoVideo: string;
  liveDemoLink: string;
  technologies: string[];
  isFeatured: boolean;
  isPublished: boolean;
  status: string;
  stock: number;
  faq: { question: string; answer: string }[];
  requirements: string[];
  fileSize: string;
  version: string;
  changelog: { version: string; notes: string; date: string }[];
  salesCount: number;
  rating: number;
  totalReviews: number;
  favoritesCount: number;
  cartCount: number;
}

interface ProjectFormProps {
  initialValues: ProjectFormValues;
  onSubmit: (values: ProjectFormValues) => Promise<void>;
  isEdit?: boolean;
  loading?: boolean;
}

export default function ProjectForm({ initialValues, onSubmit, isEdit = false, loading = false }: ProjectFormProps) {
  const router = useRouter();

  const formik = useFormik<ProjectFormValues>({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  const handleArrayAdd = (field: string, value: any) => {
    const currentArray = getIn(formik.values, field) || [];
    formik.setFieldValue(field, [...currentArray, value]);
  };

  const handleArrayRemove = (field: string, index: number) => {
    const currentArray = getIn(formik.values, field) || [];
    const arr = [...currentArray];
    arr.splice(index, 1);
    formik.setFieldValue(field, arr);
  };

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-2 mb-6 border-b border-stone-50 pb-4">
      <div className="p-2 bg-amber-50 rounded-lg text-[#7c4a32]">
        <Icon size={18} />
      </div>
      <h3 className="text-sm font-black text-stone-900 uppercase tracking-widest">{title}</h3>
    </div>
  );

  return (
    <FormikProvider value={formik}>
      <div className="max-w-6xl mx-auto space-y-8 pb-20">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-10 bg-stone-50/80 backdrop-blur-md py-4 border-b border-stone-100 -mx-4 px-4">
          <div className="flex items-center gap-4">
            <Link href="/projects" className="p-2 hover:bg-white rounded-xl text-stone-400 hover:text-[#7c4a32] transition-colors shadow-sm">
              <ChevronLeft size={24} />
            </Link>
            <div>
              <h2 className="text-2xl font-black text-stone-900 uppercase tracking-tight">
                {isEdit ? 'Edit Project' : 'Create Project'}
              </h2>
              <p className="text-stone-500 text-xs font-bold uppercase tracking-wider">
                {isEdit ? 'Update details to reflect changes' : 'Fill all details to publish your asset'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push('/projects')}
              className="px-6 py-3 bg-white text-stone-500 rounded-2xl font-black uppercase tracking-wider text-[10px] hover:bg-stone-100 transition-all border border-stone-200"
            >
              Cancel
            </button>
            <button
              onClick={() => formik.handleSubmit()}
              disabled={loading}
              className="px-8 py-3 bg-[#7c4a32] text-white rounded-2xl font-black uppercase tracking-wider text-[10px] flex items-center gap-2 hover:bg-[#5d3725] transition-all shadow-lg shadow-amber-900/20 active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Processing...' : (
                <>
                  <Save size={16} />
                  {isEdit ? 'Save Changes' : 'Publish Project'}
                </>
              )}
            </button>
          </div>
        </header>

        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Basic Info Section */}
            <section className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm transition-all hover:shadow-md">
              <SectionHeader icon={Info} title="Project Overview" />
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-2 ml-1">Project Title</label>
                  <input
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    className="w-full px-5 py-4 bg-stone-50 border-none rounded-2xl text-sm font-bold text-stone-900 focus:ring-2 focus:ring-amber-200 transition-all placeholder:text-stone-300"
                    placeholder="e.g. Ultimate React SaaS Template"
                  />
                  {formik.errors.title && <p className="text-[10px] text-red-500 mt-1 font-bold">{formik.errors.title}</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-2 ml-1">Short Description</label>
                  <input
                    name="shortDescription"
                    value={formik.values.shortDescription}
                    onChange={formik.handleChange}
                    className="w-full px-5 py-4 bg-stone-50 border-none rounded-2xl text-sm font-medium text-stone-700 focus:ring-2 focus:ring-amber-200 transition-all placeholder:text-stone-300"
                    placeholder="Summarize your project in one sentence..."
                  />
                  {formik.errors.shortDescription && <p className="text-[10px] text-red-500 mt-1 font-bold">{formik.errors.shortDescription}</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-2 ml-1">Full Description (Markdown Supported)</label>
                  <textarea
                    name="fullDescription"
                    rows={10}
                    value={formik.values.fullDescription}
                    onChange={formik.handleChange}
                    className="w-full px-5 py-4 bg-stone-50 border-none rounded-2xl text-sm font-medium text-stone-700 focus:ring-2 focus:ring-amber-200 transition-all placeholder:text-stone-300 min-h-[250px]"
                    placeholder="Detailed features, documentation links, and installation guide..."
                  />
                  {formik.errors.fullDescription && <p className="text-[10px] text-red-500 mt-1 font-bold">{formik.errors.fullDescription}</p>}
                </div>
              </div>
            </section>

            {/* Media Section */}
            <section className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm transition-all hover:shadow-md">
              <SectionHeader icon={ImageIcon} title="Visual Assets" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <CloudinaryUpload
                    label="Primary Thumbnail"
                    value={formik.values.thumbnail}
                    onUploadSuccess={(url) => formik.setFieldValue('thumbnail', url)}
                  />
                  {formik.errors.thumbnail && <p className="text-[10px] text-red-500 mt-1 font-bold">{formik.errors.thumbnail}</p>}
                </div>
                <CloudinaryUpload
                  label="Demo Video (Trailer)"
                  accept="video/*"
                  value={formik.values.demoVideo}
                  onUploadSuccess={(url) => formik.setFieldValue('demoVideo', url)}
                />
              </div>
              
              <div className="mt-8">
                <label className="block text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-4 ml-1 text-center">Gallery Images</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formik.values.images.map((img, idx) => (
                    <div key={idx} className="relative group rounded-2xl overflow-hidden border border-stone-100 aspect-video">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={() => handleArrayRemove('images', idx)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                  <div className="aspect-video">
                    <CloudinaryUpload
                      onUploadSuccess={(url) => handleArrayAdd('images', url)}
                      label=""
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ & Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm">
                <SectionHeader icon={HelpCircle} title="FAQ" />
                <FieldArray name="faq">
                  {({ push, remove }) => (
                    <div className="space-y-4">
                      {formik.values.faq.map((_, idx) => (
                        <div key={idx} className="p-4 bg-stone-50 rounded-2xl space-y-3 relative group">
                          <button 
                            type="button" 
                            onClick={() => remove(idx)}
                            className="absolute top-2 right-2 text-stone-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                          <input
                            placeholder="Question"
                            name={`faq.${idx}.question`}
                            value={formik.values.faq[idx].question}
                            onChange={formik.handleChange}
                            className="w-full bg-transparent border-none text-xs font-bold text-stone-900 focus:ring-0 p-0"
                          />
                          <textarea
                            placeholder="Answer"
                            name={`faq.${idx}.answer`}
                            value={formik.values.faq[idx].answer}
                            onChange={formik.handleChange}
                            className="w-full bg-transparent border-none text-xs text-stone-500 focus:ring-0 p-0"
                            rows={2}
                          />
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push({ question: '', answer: '' })}
                        className="w-full py-3 border-2 border-dashed border-stone-100 rounded-2xl text-[10px] font-black text-stone-400 uppercase tracking-widest hover:border-amber-200 hover:text-[#7c4a32] transition-all"
                      >
                        + Add FAQ
                      </button>
                    </div>
                  )}
                </FieldArray>
              </section>

              <section className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm">
                <SectionHeader icon={ListChecks} title="Requirements" />
                <FieldArray name="requirements">
                  {({ push, remove }) => (
                    <div className="space-y-3">
                      {formik.values.requirements.map((_, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            name={`requirements.${idx}`}
                            value={formik.values.requirements[idx]}
                            onChange={formik.handleChange}
                            className="flex-1 px-4 py-3 bg-stone-50 border-none rounded-xl text-xs font-medium text-stone-700"
                            placeholder="e.g. Node.js v18+"
                          />
                          <button type="button" onClick={() => remove(idx)} className="p-3 text-stone-300 hover:text-red-500"><Trash2 size={14} /></button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push('')}
                        className="w-full py-3 border-2 border-dashed border-stone-100 rounded-2xl text-[10px] font-black text-stone-400 uppercase tracking-widest hover:border-amber-200 hover:text-[#7c4a32] transition-all"
                      >
                        + Add Requirement
                      </button>
                    </div>
                  )}
                </FieldArray>
              </section>
            </div>

            {/* Changelog */}
            <section className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm">
              <SectionHeader icon={History} title="Changelog" />
              <FieldArray name="changelog">
                {({ push, remove }) => (
                  <div className="space-y-4">
                    {formik.values.changelog.map((_, idx) => (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-stone-50 rounded-2xl relative">
                        <button type="button" onClick={() => remove(idx)} className="absolute top-2 right-2 text-stone-300 hover:text-red-500"><Trash2 size={14} /></button>
                        <div>
                          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1 block">Version</label>
                          <input
                            name={`changelog.${idx}.version`}
                            value={formik.values.changelog[idx].version}
                            onChange={formik.handleChange}
                            className="w-full bg-white border-none rounded-xl px-3 py-2 text-xs font-bold"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1 block">Update Notes</label>
                          <input
                            name={`changelog.${idx}.notes`}
                            value={formik.values.changelog[idx].notes}
                            onChange={formik.handleChange}
                            className="w-full bg-white border-none rounded-xl px-3 py-2 text-xs"
                            placeholder="Fixed minor bugs and improved performance..."
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push({ version: '', notes: '', date: new Date().toISOString().split('T')[0] })}
                      className="w-full py-3 border-2 border-dashed border-stone-100 rounded-2xl text-[10px] font-black text-stone-400 uppercase tracking-widest hover:border-amber-200 hover:text-[#7c4a32] transition-all"
                    >
                      + Add Log Entry
                    </button>
                  </div>
                )}
              </FieldArray>
            </section>
          </div>

          {/* Right Column - Settings & Metadata */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Pricing Section */}
            <section className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm">
              <SectionHeader icon={DollarSign} title="Pricing & Sales" />
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2 ml-1">Base Price ($)</label>
                  <input
                    name="price"
                    type="number"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    className="w-full px-5 py-4 bg-stone-50 border-none rounded-2xl text-lg font-black text-[#7c4a32]"
                  />
                  {formik.errors.price && <p className="text-[10px] text-red-500 mt-1 font-bold">{formik.errors.price}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2 ml-1">Discount ($)</label>
                    <input
                      name="discountPrice"
                      type="number"
                      value={formik.values.discountPrice}
                      onChange={formik.handleChange}
                      className="w-full px-5 py-3 bg-stone-50 border-none rounded-2xl text-sm font-bold text-green-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2 ml-1">Percent (%)</label>
                    <input
                      name="discountPercentage"
                      type="number"
                      value={formik.values.discountPercentage}
                      onChange={formik.handleChange}
                      className="w-full px-5 py-3 bg-stone-50 border-none rounded-2xl text-sm font-bold text-green-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2 ml-1">Live Demo URL</label>
                  <input
                    name="liveDemoLink"
                    value={formik.values.liveDemoLink}
                    onChange={formik.handleChange}
                    className="w-full px-5 py-3 bg-stone-50 border-none rounded-2xl text-xs font-medium text-blue-500 underline"
                    placeholder="https://demo.example.com"
                  />
                </div>
              </div>
            </section>

            {/* Categorization */}
            <section className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm">
              <SectionHeader icon={Tag} title="Categorization" />
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2 ml-1">Category</label>
                  <select
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    className="w-full px-5 py-3 bg-stone-50 border-none rounded-2xl text-xs font-black text-stone-700 appearance-none cursor-pointer"
                  >
                    <option value="scripts">Scripts</option>
                    <option value="themes">Themes</option>
                    <option value="plugins">Plugins</option>
                    <option value="templates">Templates</option>
                    <option value="apps">Mobile Apps</option>
                  </select>
                  {formik.errors.category && <p className="text-[10px] text-red-500 mt-1 font-bold">{formik.errors.category}</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2 ml-1">Technologies (Enter)</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formik.values.technologies.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg uppercase tracking-wider flex items-center gap-2">
                        {tech}
                        <button type="button" onClick={() => formik.setFieldValue('technologies', formik.values.technologies.filter(t => t !== tech))}><Trash2 size={10} /></button>
                      </span>
                    ))}
                  </div>
                  <input
                    onKeyDown={(e: any) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const val = e.target.value.trim();
                        if (val && !formik.values.technologies.includes(val)) {
                          formik.setFieldValue('technologies', [...formik.values.technologies, val]);
                        }
                        e.target.value = '';
                      }
                    }}
                    className="w-full px-5 py-3 bg-stone-50 border-none rounded-2xl text-xs font-medium"
                    placeholder="React, Tailwind, Node.js..."
                  />
                </div>
              </div>
            </section>

            {/* Technical Info */}
            <section className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm">
              <SectionHeader icon={Package} title="Technical Data" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2 ml-1">Version</label>
                  <input
                    name="version"
                    value={formik.values.version}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-3 bg-stone-50 border-none rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2 ml-1">File Size</label>
                  <input
                    name="fileSize"
                    value={formik.values.fileSize}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-3 bg-stone-50 border-none rounded-xl text-xs font-bold"
                    placeholder="12.5 MB"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2 ml-1">Stock (Inventory)</label>
                <input
                  name="stock"
                  type="number"
                  value={formik.values.stock}
                  onChange={formik.handleChange}
                  className="w-full px-4 py-3 bg-stone-50 border-none rounded-xl text-xs font-bold"
                />
                <p className="text-[9px] text-stone-400 mt-1 italic">-1 for unlimited digital stock</p>
              </div>
            </section>

            {/* Status & Visibility */}
            <section className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm space-y-4">
              <SectionHeader icon={Layers} title="Publishing" />
              
              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl">
                <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest">Featured Item</span>
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formik.values.isFeatured}
                  onChange={formik.handleChange}
                  className="w-5 h-5 accent-[#7c4a32] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl">
                <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest">Live Status</span>
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formik.values.isPublished}
                  onChange={formik.handleChange}
                  className="w-5 h-5 accent-[#7c4a32] cursor-pointer"
                />
              </div>

              <select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                className="w-full px-5 py-4 bg-stone-50 border-none rounded-2xl text-xs font-black text-stone-700 appearance-none cursor-pointer"
              >
                <option value="draft">DRAFT MODE</option>
                <option value="published">ACTIVE / PUBLISHED</option>
                <option value="archived">ARCHIVED</option>
              </select>
            </section>

            {/* Initial Stats (Optional for Admin) */}
            <section className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm opacity-60 hover:opacity-100 transition-opacity">
              <label className="block text-[9px] font-black text-stone-400 uppercase tracking-[0.3em] mb-4 text-center">Initial Stats Override</label>
              <div className="grid grid-cols-2 gap-3">
                {['salesCount', 'rating', 'totalReviews', 'favoritesCount'].map(stat => (
                  <div key={stat}>
                    <label className="block text-[8px] font-black text-stone-400 uppercase mb-1">{stat}</label>
                    <input
                      name={stat}
                      type="number"
                      value={(formik.values as any)[stat]}
                      onChange={formik.handleChange}
                      className="w-full bg-stone-50 border-none rounded-lg p-2 text-[10px] font-bold"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </form>
      </div>
    </FormikProvider>
  );
}
